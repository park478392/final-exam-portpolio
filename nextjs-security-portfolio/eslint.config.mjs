import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", ".backups/**", "next-env.d.ts"]),
  { files: ["scripts/**/*.cjs"], rules: { "@typescript-eslint/no-require-imports": "off" } },
  // Archived exercises expose functions directly to HTML onclick handlers.
  { files: ["public/semester-1/**/*.js"], rules: { "@typescript-eslint/no-unused-vars": "off" } },
]);
