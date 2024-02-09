import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { grid, home } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/page/home',
    mdIcon: home
  },
  {
    title: 'Annonce',
    url: '/ajout',
    mdIcon: grid
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu id="menu" contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Portaille</IonListHeader>
          <IonNote>v1.0</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" icon={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
