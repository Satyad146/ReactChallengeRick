import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useSearch } from '@tanstack/react-router';
import CharacterCard from '../component/CharaterCard';
import { characterListRoute } from '../AppRouter';
import LoadingSpinner from '../component/LoadingSpinner';

type Character = {
  id: string;
  name: string;
  image: string;
  gender: string;
  species: string;
};

type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

type CharacterListSearch = {
  page?: string;
};

const fetchCharacters = (page: number): Promise<CharactersResponse> =>
  axios
    .get(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((response) => response.data);

function CharacterListPage() {
  const search:CharacterListSearch = useSearch({from:characterListRoute.id});
  const navigate = useNavigate();

  const page = search.page ? Math.max(1, parseInt(search.page, 10)) : 1;

  const {
    isLoading,
    error,
    data,
    isFetching,
    refetch,
  } = useQuery<CharactersResponse, Error>({
    queryKey: ['CharacterListing', page],
    queryFn: () => fetchCharacters(page),
    placeholderData: (previousData) => previousData,
  });

  const handlePageChange = (newPage: number) => {
    navigate({ to: characterListRoute.id,search: {page:String(newPage)} });
  };

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <h3>Something went wrong: {error.message}</h3>;
  if (!data) return <h3>No data found.</h3>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Characters List</h2>
        <button
          onClick={handleRefresh}
          disabled={isFetching}
          style={{
            padding: '8px 16px',
            backgroundColor: isFetching ? '#ccc' : '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isFetching ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isFetching ? (
            <>
              <div style={{
                border: '2px solid #f3f3f3',
                borderTop: '2px solid #fff',
                borderRadius: '50%',
                width: '14px',
                height: '14px',
                animation: 'spin 1s linear infinite'
              }}></div>
              Refreshing...
            </>
          ) : (
            <>
              <span style={{ fontSize: '16px' }}>↻</span>
              Refresh
            </>
          )}
        </button>
      </div>
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {page} of {data.info.pages ?? '...'}
        </span>
        <button
          onClick={() => handlePageChange(data && page < data.info.pages ? page + 1 : page)}
          disabled={data ? page === data.info.pages : true}
        >
          Next
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          marginTop: '24px',
        }}
      >
        {data.results.map((item: Character) => (
          <CharacterCard
            key={item.name}
            charID={item.id}
            name={item.name}
            gender={item.gender}
            species={item.species}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default CharacterListPage;