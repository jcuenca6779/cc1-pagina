import Footer from "../components/Footer";
import LocalesClient from "../components/LocalesClient";
import { getLocales } from "../../api/locales";

export const metadata = {
  title: "Locales - CC1",
  description: "Directorio de locales comerciales y emprendimientos.",
};

export default async function LocalesPage() {
  let initialLocales = null;
  let initialError = "";

  try {
    initialLocales = await getLocales();
  } catch (error) {
    initialError = "No se pudo cargar los locales.";
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50">
        <LocalesClient
          initialApiLocales={initialLocales}
          initialError={initialError}
        />
      </main>

      <Footer />
    </div>
  );
}
