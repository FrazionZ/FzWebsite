import { Link, Head } from '@inertiajs/react';
import Error from '../../assets/img/error.png'
import '../../css/app.css';

export default function ErrorPage({ status }) {
  
    const description = {
      503: 'Désolé, nous faisons un peu de maintenance. Veuillez revenir bientôt.',
      500: 'Oups, quelque chose s\'est mal passé sur nos serveurs.',
      401: 'Whoops, Tu n\'as pas le droit d\'être ici !',
      404: 'La Page recherchée est Introuvable',
      403: 'Désolé, il vous est interdit d\'accéder à cette page.',
    }[status]

  
    return (
      <>
        <Head title={status} />
        <div className="error-page">
          <h1>{status}</h1>
          <img src={Error} alt="error_bee" />
          <span>{description}</span>
          <Link className="btn" href="/">Accueil</Link>
        </div>
      </>
    )
}