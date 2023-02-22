import Comments from "./Components/Comments";
import "./App.css";
import "./../src/Styles/style.css";

import { Container } from "@mui/material";

const App = () => {
  return (
    // <Container maxWidth="sm">

    // <h1>Flexiple</h1>
    <Comments commentsUrl="http://localhost:3004/comments" currentUserId="1" />
    // </Container>
  );
};

export default App;
