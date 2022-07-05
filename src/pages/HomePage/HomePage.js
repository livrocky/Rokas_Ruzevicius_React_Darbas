import { useState, useEffect } from 'react';
import { baseUrl, myFetchAuth } from '../../utils';
import { useAuthCtx } from '../../store/authContext';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Card/Card';
import css from '../HomePage/HomePage.module.css';

function HomePage() {
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');
  // console.log('token ===', token);
  const [skills, setSkills] = useState([]);

  const getSkills = async (values) => {
    const fetchResult = await myFetchAuth(`${baseUrl}/v1/content/skills`, 'GET', token, values);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setSkills(fetchResult);
    }
  };

  useEffect(() => {
    if (token) getSkills();
  }, []);

  return (
    <div className={css['container']}>
      <h1 className='title'>Your Skills</h1>
      {/* <h3>Loading...</h3> */}
      <div className={css['cards-display']}>
        {skills.map((sObj) => (
          <Card key={sObj.id} {...sObj} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
