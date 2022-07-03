import Card from '../components/Card/Card';
import { useState, useEffect } from 'react';
import { baseUrl, myFetchAuth } from '../utils';
import { useAuthCtx } from '../store/authContext';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');
  // console.log('token ===', token);
  const [skills, setSkills] = useState([]);

  const getSkills = async () => {
    const fetchResult = await myFetchAuth(`${baseUrl}/v1/content/skills`, token);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setSkills(fetchResult);
    }
  };

  useEffect(() => {
    if (token) getSkills();
  }, []);

  return (
    <div className='container'>
      <h1 className='display'>Our Posts</h1>
      {/* <Link to='/posts/bubble'>Go to bubble</Link>
      <Route path='/posts/bubble'>
        <h2>I am bubble page section</h2>
      </Route> */}
      <div className=''>
        {skills.map((sObj) => (
          <Card key={sObj.id} {...sObj} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
