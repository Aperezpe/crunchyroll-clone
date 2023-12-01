import { UserConfig, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const config: UserConfig = {
    plugins: [svgr(), react()],
  }

  console.log("mode: ", mode);
  console.log("ssrBuild: ", ssrBuild);

  if (command === 'serve') {
    console.log("Local version running...")
    return {
      ...config,
    }
  } else {
    return {
      ...config,
    }
  }

})
