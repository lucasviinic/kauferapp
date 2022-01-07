import React from 'react';
import { View, Button } from 'react-native'
import { useAuth } from '../../contexts/auth';

import ProfilePictureIcon from '../../components/ProfilePictureIcon';
import SearchField from '../../components/SearchField'
import Logo from '../../assets/logo.svg'

import {
  Container,
  SearchArea,
} from './styles'

export default function Home({ navigation }) {

    const { signOut } = useAuth();

    return(
        <Container>
            <View style={{
                marginRight: "9.5%",
                marginTop: "7%",
                height: 35, 
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end"
            }}>
            </View>

            {/* Boão de teste */}
            <Button onPress={() => signOut()} title="Sair" />

            <ProfilePictureIcon style={{marginLeft: "auto", marginRight: 11, marginTop: -35}} />

            <SearchArea>
                <Logo width={220} marginLeft={"auto"} marginRight={"auto"} marginBottom={-60} />
                <SearchField navigation={navigation} />
            </SearchArea>
        </Container>
    )
}