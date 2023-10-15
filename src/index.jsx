import { createRoot } from 'react-dom/client';

//Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

//Main component
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div> Good morning </div>
    </div>
  );
};

//Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React ti render your app in the root DOM element
root.render(<MyFlixApplication />);