import { Badge } from "@material-tailwind/react";
import React from "react";

const AddPicture = ({ image, setImage }) => {
  const handleImageChange = (event) => {
    console.log(event);
    setImage(event.target.files[0]);
  };
  const handleImageDelete = () => {
    setImage(null);
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center gap-y-2  group mt-2">
        <span className="pl-1 text-blue-gray-900 font-bold w-full">
          ارفق صورة
        </span>
        {image ? (
          <Badge
            withBorder
            className="cursor-pointer transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20"
            content={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            }
            onClick={handleImageDelete}
          >
            <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
              {image ? (
                <span>{image?.name}</span>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>

                  <span>رفع</span>
                </>
              )}

              <input
                type="file"
                onChange={(ev) => handleImageChange(ev)}
                className="hidden"
              />
            </label>
          </Badge>
        ) : (
          <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
            {image ? (
              <span>{image?.name}</span>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>

                <span>رفع</span>
              </>
            )}

            <input
              type="file"
              onChange={(ev) => handleImageChange(ev)}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default AddPicture;
