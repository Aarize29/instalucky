import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import Modal from 'react-modal';

const Home = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [dataset, setDataset] = useState([]);
  const [selectedComments, setSelectedComments] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (comments) => {
    setSelectedComments(comments);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getUserId = async (longLivedToken) => {
    try {
      const res = await axios.get(`https://graph.facebook.com/v19.0/me/accounts?fields=id%2Cname%2Caccess_token%2Cinstagram_business_account&access_token=${longLivedToken}`);
      return res.data.data[0].instagram_business_account.id;
    } catch (error) {
      console.error('Error fetching user id:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = location.hash;
      const parameters = url.split('&');
      let longLivedToken = '';

      parameters.forEach(param => {
        if (param.includes('long_lived_token=')) {
          longLivedToken = param.split('=')[1];
        }
      });

      const userId = await getUserId(longLivedToken);
      localStorage.setItem("accesstoken", longLivedToken);
      localStorage.setItem("userid", userId);
      setLoading(false);
    };

    fetchData();
  }, [location.hash]);

  const accesstoken = localStorage.getItem('accesstoken');
  const userid = localStorage.getItem('userid');

  const getMediaData = async () => {
    try {
      const res = await axios.get(`https://graph.facebook.com/v19.0/${userid}/media?fields=id,media_url,comments_count,comments,caption,timestamp&access_token=${accesstoken}`);
      setDataset(res.data.data);
    } catch (error) {
      console.error('Error fetching media data:', error);
    }
  };

  useEffect(() => {
    if (!loading) {
      getMediaData();
    }
  }, [loading]);

  //console.log(dataset);
  useEffect(() => {
    const getSentiments = async () => {
      if (dataset.length > 0) {
        try {
          const res = await fetch("https://instasight-api.azurewebsites.net/api/ai-sentiment", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
          
            body: JSON.stringify(dataset)
          });
          const data = await res.json();
          console.log(data)
          const updatedDataset = dataset.map((item, index) => ({
            ...item,
            sentiments: data[index].sentiments // Assuming the response data structure
          }));
          setDataset(updatedDataset);
        } catch (error) {
          console.log('Error fetching sentiments:', error);
        }
      }
    };
    getSentiments();
  }, [dataset]);
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
        </div>
        <div className="flex justify-center mb-4">
          <Button><Link to="/posts">View Posts</Link></Button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Media ID</th>
              <th className='py-2 px-4 border-b border-gray-200'>Post</th>
              <th className="py-2 px-4 border-b border-gray-200">Comments</th>
            </tr>
          </thead>
          <tbody>
            {dataset.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b border-gray-200">{item.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.caption}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <Button onClick={() => openModal(item.comments ? item.comments.data : [])}>View Comments</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Comments Modal"
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl mb-4">Comments</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Comment</th>
              <th className="py-2 px-4 border-b border-gray-200">Sentiments</th>
            </tr>
          </thead>
          <tbody>
            {selectedComments.length > 0 ? (
              selectedComments.map((comment, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200">{comment.text}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{comment.sentiments}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b border-gray-200" colSpan="2">No comments available</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <Button onClick={closeModal}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
