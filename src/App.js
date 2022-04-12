import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from './components/Header';
import Contents from './components/Contents';
import SettingsSidebar from './components/SettingsSidebar';
import { fetchStatusPointsRequest } from './reducers/statusPoints';
import { fetchSettingsRequest } from './reducers/settings';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSettingsRequest());
    dispatch(fetchStatusPointsRequest());
  });

  return (
    <>
      <Header />
      <Contents />
      <SettingsSidebar />
    </>
  );
};

export default App;
