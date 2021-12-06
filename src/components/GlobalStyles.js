import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        background: #333;
        &::-webkit-scrollbar{
            width: 0.5rem;
        }
        &::-webkit-scrollbar-thumb{
            background-color: darkgray;
        }
        &::-webkit-scrollbar-track{
            background: white;
        }
    }

    .background-image{
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        opacity:0.4;
        filter: blur(8px);width: 100%;
        height: 100%;
        position: fixed;
        z-index: -1;
    }

    body {
        font-family: 'Overpass', sans-serif;
        width: 100%;
    }

    input{
        font-weight:bold;
        font-family: 'Overpass', sans-serif;
    }

    h2{
        font-family: 'Bungee', cursive;
        font-size: 3rem;
        font-weight: lighter;
        text-shadow: 0px 0px 20px black;
        color: #eee
    }
    h3 {
        font-size: 1.3rem;
        color: #eee;
        padding: 1.5rem 0rem;
    }
    p{
        font-size: 1.2rem;
        line-height: 200%;
        color: #ddd;
    }
    a{
        text-decoration:none;
    }
    img{
        display: block;
    }

    @media (max-width: 800px) {
        h2{
        font-size: 2.2rem;
        }
        h3 {
            font-size: 1.5rem;
        }
  }

    @media (max-width: 470px) {
        h2{
        font-size: 2rem;
        }
        h3 {
            font-size: 1.3rem;
        }
  }
`;

export default GlobalStyles;
