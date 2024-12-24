import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { autProvider } from "../../firebase/conf";
import server from "../axios/server";
import { rememberUser, setUser } from "../../store/slices/user/userSlice";
import { toast } from "react-toastify";

const useLoginWithGoogle = (errMessage) => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {

    signInWithPopup(auth, autProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        server
          .post(`/login/google`, {
            email: user.email,
            device_token: token,
            id: user.uid,
            displayName: user.displayName,
          })
          .then((data) => {
            dispatch(
              setUser({
                user: data.data.data.data,
                token: data.data.data.token,
              })
            );
            dispatch(
              rememberUser({
                user: data.data.data.data,
                token: data.data.data.token,
              })
            );
            window.location.href = "/";
          })
          .catch(() => {
            toast.error(errMessage);
          });
      })
      .catch(() => {
        toast.error(errMessage);
      });
  };

  return handleGoogleSignIn;
};

export default useLoginWithGoogle;
