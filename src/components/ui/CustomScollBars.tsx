import { Scrollbars } from "react-custom-scrollbars";

interface CustomScrollbarProps {
  style?: {
    [key: string]: string;
  };
}

const renderThumb: React.FC<CustomScrollbarProps> = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: "#5865f2",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars: React.FC<CustomScrollbarProps> = (props) => {
  return (
    <Scrollbars
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      {...props}
    />
  );
};

export default CustomScrollbars;
