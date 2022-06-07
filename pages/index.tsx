import { Box, Button, Text } from '@chakra-ui/react'
import { UniversityList, UniversityService } from 'api_clients'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'


interface HomePageProps {
  universities: UniversityList[]
}

const Home: NextPage<HomePageProps> = ({universities}: HomePageProps) => {
  const router = useRouter()

  return (
    <Box>
      <Head>
        <title>Ubicor</title>
        <meta name="description" content="Ubicor web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display="flex" alignItems="center" flexDir="column" padding={2}>
        <Text fontSize="4xl" fontWeight="bold" mt={5}>Ubicor</Text>

        <Box mt={10}>
          {
            universities.map((u: UniversityList) => (
              <Link key={u.id} href={`/${u.slug}`}><a>
                <Button
                  variant="ghost"
                  borderWidth={1} borderColor="gray.700" boxShadow="lg"
                  px={10} size="lg" rounded="full" mb={2}>
                    <Text fontWeight="bold" color="gray.700">{u.name}</Text>
                </Button>
              </a></Link>
            ))
          }
        </Box>
      </Box>
    </Box>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const universities = await UniversityService.universityList()

  if (universities.length == 1) {
    const university = universities[0]
    return {
      redirect: {
        destination: `/${university.slug}`,
        permanent: false
      }
    }
  }

  return {
    props: {universities}
  }
}


export default Home
