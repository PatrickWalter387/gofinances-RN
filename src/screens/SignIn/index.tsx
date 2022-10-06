import React, { useContext } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { AuthContext } from '../../AuthContext';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';

export default function SignIn() {
    const { signInWithGoogle, isLoggingIn } = useAuth();
    const theme = useTheme();

    async function handleSignInWithGoogle(){
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Google');
        }
    }

    return (
        <Container>
        <Header>
            <TitleWrapper>
            <LogoSvg 
                width={120}
                height={68}
            />

            <Title>
                Controle suas{'\n'}
                finanças de forma{'\n'}
                muito simples
            </Title>
            </TitleWrapper>

            <SignInTitle>
            Faça seu login com{'\n'}
            uma das contas abaixo
            </SignInTitle>
        </Header>

        <Footer>
            <FooterWrapper>
                <SignInSocialButton
                    title="Entrar com Google"
                    svg={GoogleSvg}
                    onPress={(handleSignInWithGoogle)}
                />
            </FooterWrapper>

            { isLoggingIn && (
                <ActivityIndicator
                    color={theme.colors.shape}
                    style={{ marginTop: 18 }}
                />
            ) }
        </Footer>
        </Container>
    )
}