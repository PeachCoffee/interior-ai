import React from 'react';
// import { UserButton } from '@clerk/nextjs';  // UserButton 제거
import Listing from './_components/Listing';

function Dashboard() {
  return (
    <div>
      {/* <UserButton />  삭제 */}
      <Listing />
    </div>
  );
}

export default Dashboard;