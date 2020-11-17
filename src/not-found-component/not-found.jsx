import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
<div className="content-search">
<h1>Aie, page non Trouvée ...</h1>
<p style={{textAlign: 'center'}}>Vous avez cliqué sur un mauvais lien </p>
<center><Link  to="/">Return to Home Page</Link></center>
</div>
);
export default NotFound;