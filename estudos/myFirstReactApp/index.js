const app = document.getElementById('app');
// Create a new H1 element
// const header = document.createElement('h1');

// // Create a new text node for the H1 element
// const text = 'Develop. Preview. Ship.';
// const headerContent = document.createTextNode(text);

// // Append the text to the H1 element
// header.appendChild(headerContent);

// // Place the H1 element inside the div
// app.appendChild(header);


function Header(props) {
   console.log(props)
   return (<h1>{props.title}</h1>)
}
function Header2({ title }) {
// explicitly name the values of props
   console.log(title) //React
   return (<h1>{createTitel(title)}</h1>)
}
function HomePage(){
   return (
      <div>
         {/* Nesting the Header component */}
         <Header title="React" />
         <Header2 title="Next.js" />
      </div>
   )
}

function createTitel(title){
   if(title){
      return title;
   }
   return 'Default title'
}

const root = ReactDOM.createRoot(app);
// root.render(<h1>Develop. Preview. Ship.</h1>);
root.render(<HomePage />);