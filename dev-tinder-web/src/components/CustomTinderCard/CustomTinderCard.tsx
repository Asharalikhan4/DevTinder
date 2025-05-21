import { FC } from "react";
import TinderCard from "react-tinder-card";
import Image from "next/image";
import { CustomTinderCardProps } from "@/globalTypes";
import truncateString from "@/utils/truncateString";

const CustomTinderCard: FC<CustomTinderCardProps> = ({ _id, photoUrl, name, age, gender, about }) => {
    return (
        <TinderCard
            onSwipe={(direction) => console.log(direction)}
            key={_id}
            className="absolute shadow-none"
            swipeRequirementType="position"
            swipeThreshold={100}
            preventSwipe={["up", "down"]}>
            <div className="card bg-white w-full sm:w-96 h-[30rem] sm:h-[35rem] select-none rounded-lg overflow-hidden border border-gray-200">
                <Image
                    draggable={false}
                    src={photoUrl}
                    alt={"User Image"}
                    className="object-cover h-[67%] pointer-events-none"
                    height={100}
                    width={100}
                />
                <div className="card-body bg-base-200 p-4">
                    <div className="mb-3">
                        <h2 className="text-lg sm:text-xl font-semibold">{name}</h2>
                        <p className="text-sm sm:text-base text-gray-600 sm:mt-1 mb-2">{`${age}, ${gender}`}</p>
                        <p className="text-gray-300 text-sm sm:text-base">
                            {truncateString(about, 40) || "No description available"}
                        </p>
                    </div>
                    <div className="card-actions flex justify-between space-x-2">
                        <button
                            onClick={() => handleSendRequest("ignored", _id)}
                            className="btn btn-error btn-sm sm:btn-md flex-1">
                            Ignore
                        </button>
                        <button
                            onClick={() => handleSendRequest("interested", _id)}
                            className="btn btn-primary btn-sm sm:btn-md flex-1">
                            Interested
                        </button>
                    </div>
                </div>
            </div>
        </TinderCard>
    );
};

export default CustomTinderCard;