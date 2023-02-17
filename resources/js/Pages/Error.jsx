import { Link, Head } from '@inertiajs/react';
import Error from '../../assets/img/error.png'

export default function ErrorPage({ status }) {
  
    const description = {
      503: 'Sorry, we are doing some maintenance. Please check back soon.',
      500: 'Whoops, something went wrong on our servers.',
      404: 'La Page recherchée est Introuvable',
      403: 'Sorry, you are forbidden from accessing this page.',
    }[status]

    console.log(status)
  
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