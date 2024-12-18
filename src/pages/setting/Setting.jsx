import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../../store/slices/settings/settingsSlice";
import useProtectedRoute from "../../assets/hooks/useProtectedRoute";

const Setting = () => {
  const dispatch = useDispatch();
  useProtectedRoute();
  // to get lang
  const { lang } = useSelector((state) => state.settings);
  return (
    <main className="container mx-auto min-h-[200px] flex items-start justify-start">
      <select
        onChange={(e) => {
          dispatch(changeLang({ lang: e.target.value }));
        }}
        name="lang"
        value={lang}
        className="w-[200px] flex items-center justify-center rounded-[8px] mt-[20px] "
      >
        <option value="en">English</option>
        <option value="ar">العربيه</option>
      </select>
    </main>
  );
};

export default Setting;
