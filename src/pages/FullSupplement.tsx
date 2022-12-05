import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullSupplement: React.FC = () => {
  const [supplement, setSupplement] = React.useState<{
    imageUrl: string;
    title: string;
    description: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(
          `https://635c69c9f0bc26795bfe6989.mockapi.io/supplements/${id}`,
        );
        setSupplement(data);
      } catch (error) {
        alert('Oops! Something went wrong... Redirecting You to the main page');
        navigate('/');
      }
    })();
  }, []);

  if (!supplement) {
    return <>...Loading</>;
  }

  return (
    <div className="fullSupplement">
      <img src={'../' + supplement.imageUrl} alt="SupplementImg" />
      <div className="fullSupplement__description">
        <h2>{supplement.title}</h2>
        <p>{supplement.description}</p>
        <h4>{supplement.price} $</h4>
      </div>
    </div>
  );
};

export default FullSupplement;
