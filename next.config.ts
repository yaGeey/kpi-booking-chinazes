import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },
   // TODO add caching cacheLiefe, cacheComponents
   experimental: {
      useLightningcss: true,
      typedRoutes: true,
      turbopackPersistentCachingForDev: true,
      ppr: 'incremental', // TODO
      authInterrupts: true, // TODO
      browserDebugInfoInTerminal: true,
   },
}

export default nextConfig
