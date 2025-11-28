import React from 'react';

function UserProfile() {
  return (
    
    <div className="bg-gray-100 mx-auto my-20 rounded-lg shadow-lg text-center 
                    sm:p-4 sm:max-w-xs 
                    md:p-8 md:max-w-sm">
      
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full mx-auto 
                   sm:w-24 sm:h-24 
                   md:w-36 md:h-36"
      />
      
      
      <h1 className="text-blue-800 my-4 
                     sm:text-lg 
                     md:text-xl">
        John Doe
      </h1>
      
     
      <p className="text-gray-600 
                    sm:text-sm 
                    md:text-base">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
      
    </div>
  );
}

export default UserProfile;