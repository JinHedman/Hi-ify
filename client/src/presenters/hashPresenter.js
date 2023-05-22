import React from 'react';

function HashPresenter(props){ 
    const [hashState, setHash]=React.useState(window.location.hash);
    React.useEffect( function(){  
      const listener = function(){ setHash(window.location.hash);}
      window.addEventListener("hashchange", listener);
      return function(){ 
        window.removeEventListener("hashchange", listener)
      }
    }, []); 

         return props.hash.find((h)=> h === hashState)?
         <>{props.children}</>:
         <div className="hidden">{props.children}</div>;
  }  
  
export default HashPresenter;