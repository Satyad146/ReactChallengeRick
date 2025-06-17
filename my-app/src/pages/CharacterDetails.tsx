import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, Link } from '@tanstack/react-router';
import { characterDetailRoute } from '../AppRouter';
import LoadingSpinner from '../component/LoadingSpinner';

type CharacterDetail = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

const fetchCharacterDetail = (id: string): Promise<CharacterDetail> =>
  axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => response.data);

function CharacterDetailPage() {
  const { characterId } = useParams({ from: characterDetailRoute.id });

  const { isLoading, error, data } = useQuery<CharacterDetail, Error>({
    queryKey: ['CharacterDetail', characterId],
    queryFn: () => fetchCharacterDetail(characterId),
  });

  if (isLoading) return <LoadingSpinner />;;
  if (error) return <h3>Something went wrong: {error.message}</h3>;
  if (!data) return <h3>Character not found.</h3>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Character List
      </Link>
      
      <div style={{ 
        background: '#fff', 
        borderRadius: '12px', 
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <img
            src={data.image}
            alt={data.name}
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '12px',
              objectFit: 'cover',
            }}
          />
          
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h1 style={{ marginTop: 0 }}>{data.name}</h1>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <strong>Status:</strong>{' '}
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: data.status === 'Alive' ? '#10b981' : 
                             data.status === 'Dead' ? '#ef4444' : '#6b7280',
                  color: 'white',
                  fontSize: '0.875rem'
                }}>
                  {data.status}
                </span>
              </div>
              
              <div><strong>Species:</strong> {data.species}</div>
              {data.type && <div><strong>Type:</strong> {data.type}</div>}
              <div><strong>Gender:</strong> {data.gender}</div>
              
              <div>
                <strong>Origin:</strong> {data.origin.name}
              </div>
              
              <div>
                <strong>Last Known Location:</strong> {data.location.name}
              </div>
              
              <div>
                <strong>First Seen:</strong> {new Date(data.created).toLocaleDateString()}
              </div>
              
              <div>
                <strong>Number of Episodes:</strong> {data.episode.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailPage;