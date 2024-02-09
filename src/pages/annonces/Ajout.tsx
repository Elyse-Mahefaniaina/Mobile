import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const history = useHistory();

const Ajout: React.FC = () => {
  const [titre, setTitre] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [modele, setModele] = useState<string>('');
  const [boiteVitesse, setBoiteVitesse] = useState<string>('');
  const [sourceEnergie, setSourceEnergie] = useState<string>('');
  const [suspension, setSuspension] = useState<string>('');
  const [systemDirection, setSystemDirection] = useState<string>('');
  const [systemeFreinage, setSystemeFreinage] = useState<string>('');
  const [couleurInterieur, setCouleurInterieur] = useState<string>('');
  const [couleurExterieur, setCouleurExterieur] = useState<string>('');
  const [prix, setPrix] = useState<number>(0);
  const [state, setState] = useState<number>(0);
  const [photos, setPhotos] = useState<File[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push('/login');
    }
  }, []);

  const handleAddAd = () => {
    const annonceData = {
      titre,
      description,
      modele,
      boiteVitesse,
      sourceEnergie,
      suspension,
      systemDirection,
      systemeFreinage,
      couleurInterieur,
      couleurExterieur,
      prix,
      state,
      photos
    };

    console.log('Annonce à envoyer:', annonceData);
    fetch("https://okazy-production.up.railway.app/authentication/login", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(annonceData)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.data);
            history.push('/ajout');
        })
        .catch(error => {
            console.error('Erreur lors de la requête:', error);
        });
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setPhotos(prevPhotos => [...prevPhotos, ...files]);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonTitle>Ajouter une annonce</IonTitle>
        <IonInput value={titre} placeholder="Titre" onIonChange={e => setTitre(e.detail.value!)}></IonInput>
        <IonInput value={description} placeholder="Description" onIonChange={e => setDescription(e.detail.value!)}></IonInput>
        <IonInput value={modele} placeholder="Modèle" onIonChange={e => setModele(e.detail.value!)}></IonInput>
        <IonInput value={boiteVitesse} placeholder="Boîte de vitesse" onIonChange={e => setBoiteVitesse(e.detail.value!)}></IonInput>
        <IonInput value={sourceEnergie} placeholder="Source d'énergie" onIonChange={e => setSourceEnergie(e.detail.value!)}></IonInput>
        <IonInput value={suspension} placeholder="Suspension" onIonChange={e => setSuspension(e.detail.value!)}></IonInput>
        <IonInput value={systemDirection} placeholder="Système de direction" onIonChange={e => setSystemDirection(e.detail.value!)}></IonInput>
        <IonInput value={systemeFreinage} placeholder="Système de freinage" onIonChange={e => setSystemeFreinage(e.detail.value!)}></IonInput>
        <IonInput value={couleurInterieur} placeholder="Couleur intérieure" onIonChange={e => setCouleurInterieur(e.detail.value!)}></IonInput>
        <IonInput value={couleurExterieur} placeholder="Couleur extérieure" onIonChange={e => setCouleurExterieur(e.detail.value!)}></IonInput>
        <IonInput type="number" value={prix} placeholder="Prix" onIonChange={e => setPrix(parseInt(e.detail.value!, 10))}></IonInput>
        <IonInput type="number" value={state} placeholder="State" onIonChange={e => setState(parseInt(e.detail.value!, 10))}></IonInput>
        <input type="file" multiple onChange={handlePhotoChange}></input>
        <IonButton onClick={handleAddAd}>Ajouter l'annonce</IonButton>
        {photos.map((photo, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(photo)} alt={`Photo ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }} />
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Ajout;
