import React, { useEffect, useState } from "react";
import "./style.css";
import Values from "./details.js";

function App() {
  const [searchterm, setSearchterm] = useState("");
  const [data,setdata]=useState(Values);
  const [arr,setarr]=useState([])
  useEffect(()=>{
     const products=async ()=>{
      const res=await fetch("https://fakestoreapi.com/products")
      setarr(await res.json());
      }
      products();
  },[])
   
  const update=()=>{
      const updatedata=[];
      if(arr.length !== data.length){
          updatedata[0]=arr[data.length+1];
         for(let i=1;i<data.length+1;i++){
          updatedata[i]=arr[i-1];
         }
        setdata(updatedata)
      }
  }

  return (
    <>
      <div className="template">
        <div className="searchbar">
            <input
              type="text"
              placeholder="Search here..."
              className="one"
              onChange={(e) => {
                setSearchterm(e.target.value);
              }}
              style={{ width: 400, height: 35,marginLeft:500 }}
            />
            <button style={{borderRadius:25,marginLeft:20,backgroundColor:"aqua",fontSize:30,width:50}}
            onClick={update}>+</button>
        </div>
        <div className="container">
          {data.filter((val) => {
            if (searchterm === "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchterm.toLocaleLowerCase())
            ) {
              return val;
            }
          }).map((items) => {
            return (
              <div>
                <center>
                  <h2>{items.title}</h2>
                  <table>
                    <tr>
                      <td>
                        <img
                          src={items.image}
                          alt=""
                          width={"180px"}
                          height={"200px"}
                        />
                      </td>

                      <td>
                        <p>{items.description}</p>
                        <h2>Price : ${items.price} </h2>

                        <h4>Rating : {items.rating.rate}</h4>
                        <h4 style={{ color: "red" }}>
                          Count:{items.rating.count}
                        </h4>
                      </td>
                    </tr>
                  </table>
                </center>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
