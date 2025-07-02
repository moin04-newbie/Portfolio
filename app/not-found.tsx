import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-light mb-4">404</h1>
        <h2 className="text-2xl font-light mb-8">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <Button asChild className="bg-white text-black hover:bg-gray-200">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}
