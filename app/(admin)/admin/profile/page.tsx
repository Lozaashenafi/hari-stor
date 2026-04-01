import { getCompanyProfile } from "@/services/company.service"
import CompanyProfileForm from "./CompanyProfileForm"

export default async function ProfilePage() {
  const profile = await getCompanyProfile()

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4">
      <header className="mb-10 mt-6">
        <h1 className="font-serif text-4xl md:text-6xl text-white italic">Brand Identity</h1>
        <p className="text-[#5a3e00] text-xs uppercase tracking-[0.4em] font-black mt-4">
          Global Brand Settings & Socials
        </p>
      </header>

      <CompanyProfileForm profile={profile} />
    </div>
  )
}