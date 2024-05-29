import { RotatingLines } from "react-loader-spinner";
export default function Loader() {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "-1",
        top: "20%",
      }}
    >
      <RotatingLines
        strokeColor="lightGray"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}
