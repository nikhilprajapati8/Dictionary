import "./mainComp.css";
import { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import searchImg from "../assets/search.svg"

// eslint-disable-next-line react/prop-types
const MainComp = () => {
  const [input, setInput] = useState("");
  const [checkFound, setCheckFound] = useState(null);
  const [data, setData] = useState([]);
  const [audio, setAudio] = useState(null);
  const audioRef = useRef(null);


const handleSubmit = (e) => {
e.preventDefault();
}

  useEffect(() => {
   
      const fetchData = setTimeout(async() => {
        if(input){
          const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;
          const response = await fetch(url);
  
          if (response.ok) {
            const data = await response.json();
            setData(data);
            setCheckFound(true)
           
  
            if (data[0].phonetics.length > 0) {
              const audio = data[0].phonetics.find((phonetic) =>  phonetic.audio)?.audio || null;
              
              setAudio(audio);
            } else{
              setAudio(null)
             
            }
            
          }else{
            setData([])
            setCheckFound(false)
          }
      
        }
      }, 500)

    return () => clearTimeout(fetchData)
  }, [input]);


  const playAudio = async () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  };


  return (
    <main >
      <div className="mainComp">
        <div className="input">
          <form action="/" onSubmit={handleSubmit}>
            <input
              onChange={(e)=>setInput(e.target.value)}
              type="text"
              value={input}
              placeholder="Search"
              required
              autoComplete="off"
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>

        {data.length > 0 ? (
          <>
            <div className="meaning-button">
              <div className="meaning">
                <h1>{data[0].word}</h1>
                <h4>
                  {data[0].phonetic}
                </h4>
              </div>

              {audio !== null && (
                <div className="button">
                  <audio ref={audioRef} src={audio}></audio>
                  <button onClick={playAudio}>
                    <i className="fa-solid fa-play"></i>
                  </button>
                </div>
              )}
            </div>

            {data.map((item, index) => (
              <Fragment key={index}>
                {item.meanings.map((meaning, index) => (
                  <div key={Math.random() * index} className="words-meaning">
                    <div className="part-of-speech">
                      <h2>{meaning.partOfSpeech}</h2>
                      <div className="line"></div>
                    </div>

                    <h3>Meaning</h3>

                    {meaning.definitions.map((definition, index) => (
                      <ul key={index}>
                        <li>
                          <span>{definition.definition}</span>
                        </li>
                      </ul>
                    ))}

                    {meaning.synonyms.length > 0 && (
                      <div key={index} className="additional-info">
                        <h3>Synonyms</h3>
                        <p>{meaning.synonyms.join(" , ")}</p>
                      </div>
                    )}
                  </div>
                ))}
              </Fragment>
            ))}
          </>
        )
          :
          <div className="Not-found">
            <h2>{checkFound === null ?
              <div className="search-img">
                <img style={{ height: "300px", width: "300px" }} src={searchImg} alt="search" />
              </div>

              : "Not found"}</h2>
          </div>}
      </div>
    </main>
  );
};

export default MainComp;
