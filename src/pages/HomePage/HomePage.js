import { useState, useEffect } from 'react';
import { baseUrl, myFetchAuth } from '../../utils';
import { useAuthCtx } from '../../store/authContext';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Card/Card';
import css from '../HomePage/HomePage.module.css';
import toast from 'react-hot-toast';

function HomePage() {
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');
  const [skills, setSkills] = useState([]);

  const getSkills = async (values) => {
    const fetchResult = await myFetchAuth(`${baseUrl}/v1/content/skills`, 'GET', token, values);
    // console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setSkills(fetchResult);
    }
  };

  useEffect(() => {
    if (token) getSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skills.length !== 0) {
    return (
      <div className={css['container']}>
        <h1 className={css['title']}>Your Skills</h1>
        <div className={css['cards-display']}>
          {skills.length > 0
            ? skills.map((sObj) => <Card key={sObj.id} {...sObj} />)
            : toast.loading('Waiting...')}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className={css['title']}>Your skills</h1>
        <div className={css['container']}>
          <h3>You don't have any skills added.</h3>
        </div>
      </div>
    );
  }
}

export default HomePage;
