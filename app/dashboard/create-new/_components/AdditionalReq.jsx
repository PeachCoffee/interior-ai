import React from 'react';

function AdditionalReq({ additionalReqInput }) {
  return (
    <div>
      {/* ... */}
      <textarea
        className="textarea textarea-bordered h-24 w-full"
        onChange={(e) => additionalReqInput(e.target.value)}
      ></textarea>
    </div>
  );
}

export default AdditionalReq;