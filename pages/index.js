import {Authenticator, useTheme, View, Image, withAuthenticator} from "@aws-amplify/ui-react";
import BottomNavbar from '@/components/BottomNavbar';
import {useState} from "react";
import styles from "../styles/Home.module.css";
import Header from "@/components/Header";



export function getServerSideProps() {
  const renderedAt = new Date();
  const formattedBuildDate = renderedAt.toLocaleDateString("en-US", {
    dateStyle: "long",
  });
  const formattedBuildTime = renderedAt.toLocaleTimeString("en-US", {
    timeStyle: "long",
  });
  return {
    props: {
      renderedAt: `${formattedBuildDate} at ${formattedBuildTime}`,
    },
  };
}

const components = {
  Header() {
    const {tokens} = useTheme();

    return (
        <View textAlign="center" padding={tokens.space.large} backgroundColor={"#047d95"}>
          <Image
              alt="Amplify logo"
              src="https://docs.amplify.aws/assets/logo-dark.svg"
          />
        </View>
    );
  },
}

export default function Home({ renderedAt }) {
  const [activeComponent, setActiveComponent] = useState('Home');

  return (
      <Authenticator socialProviders={[ 'google']} signUpAttributes={['email', "preferred_username",'birthdate', 'phone_number']} components={components}>
        {({ signOut, user }) => (
      <div className={styles.container}>
        <Header />
        <div>

            {/*<div>
              <button onClick={signOut}>Sign out</button>
            </div>*/}
            <div className={styles.view}>
              {activeComponent === 'Profile' && <div>C1</div>}
              {activeComponent === 'Home' && <div>C2</div>}
              {activeComponent === 'Profile' && <div>C3</div>}
            </div>
        </div>
        <BottomNavbar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />

      </div>

        )}

      </Authenticator>

  );
}

