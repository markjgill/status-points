import Header from "./Header";
import Contents from "./Contents";
import SettingsSidebar from "./SettingsSidebar";
import useFetchSettings from "../apis/useFetchSettings";
import useFetchPoints from "../apis/useFetchPoints";

const Page = () => {
  console.info("Loading Page");

  useFetchSettings();
  useFetchPoints();

  return (
    <>
      <Header />
      <Contents />
      <SettingsSidebar />
    </>
  );
};

export default Page;
