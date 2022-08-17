import { NextPage } from "next";
import useAuth from "../../hooks/useAuth";
import { UseProtectedRoute } from "../../components/Routing";

const UserProfilePage: NextPage = () => {
  const {logout} = useAuth();
  const auth = useAuth()

  return (
      <main>
          Profile page of {auth.user?.displayName}
          <br />
          <br />
          <button onClick={() => logout('/')}> 
            Sign out 
          </button>
      </main>
  );
};

export default UseProtectedRoute(UserProfilePage);