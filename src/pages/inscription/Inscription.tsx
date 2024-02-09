import React, { useRef, useState } from 'react';
import './Inscription.css';
import { IonButton, IonContent, IonInput, IonModal, IonPage, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Inscription: React.FC = () => {
  const nomRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const login = () => {
    const nomValue = nomRef.current?.value;
    const usernameValue = usernameRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    
    if (usernameValue && passwordValue) {
        fetch("https://okazy-production.up.railway.app/authentication/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nom: nomValue,
            username: usernameValue,
            password: passwordValue
        })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.data);
            history.push('/');
        })
        .catch(error => {
            openModal()
            console.error('Erreur lors de la requête:', error);
        });
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className='page'>
          <div>
            <IonTitle>Login</IonTitle>
            <div style={{ marginTop: '25px' }}>
              <IonInput ref={nomRef} type="text" placeholder="Nom"></IonInput>
              <IonInput ref={usernameRef} type="text" placeholder="Username"></IonInput>
              <IonInput ref={passwordRef} type="password" placeholder="Password"></IonInput>
              <IonButton expand="full" onClick={login}>Connexion</IonButton>
            </div>
          </div>
        </div>

        <IonModal isOpen={showModal} onDidDismiss={closeModal}>
          <p>Erreur lors de la connexion</p>
          <IonButton onClick={closeModal}>Ok</IonButton>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default Inscription;
