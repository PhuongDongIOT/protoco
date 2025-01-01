import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';
import React from 'react';
import { Startup } from '@/screens'

interface HomeScreenProps { } 
const HomeScreen = ({ navigation }: RootScreenProps<Paths.Startup>) => {
  return (
    <Startup navigation={navigation} />
  )
}

export default HomeScreen;
