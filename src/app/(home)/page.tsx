import Pagination from '@/app/cmoponents/pagination/Pagination'
import getUserData, { IUserDataParams } from '../actions/getUserData'
interface HomeProps {
  searchParams: IUserDataParams
}
const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const { page, skip } = searchParams;
  const userData = await getUserData(searchParams);
  return (
    <main>
      <div>
        {userData.data.map((user) => (
          <div key={user.id}>
            ID : {user.id} {user.title}1
          </div>
        ))}
        {userData.totalItems}
      </div>
      <Pagination
        page={page ? Number(page) : 0}
        skip={skip ? Number(skip) : 0}
        totalItems={userData.totalItems}
      />
    </main>
  );
};
export default Home
