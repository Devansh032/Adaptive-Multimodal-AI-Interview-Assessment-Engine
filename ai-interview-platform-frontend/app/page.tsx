import { Logo } from '@/components/shared'
import { LoginCard } from '@/components/auth/login-card'
import { ProductPreview } from '@/components/auth/product-preview'

export default function HomePage() {
  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden border-r bg-muted/40 p-10 lg:flex">
        <Logo />
        <div className="flex max-w-lg flex-col gap-6">
          <p className="text-sm font-medium text-brand">AI technical interviews</p>
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance">
            Hire engineers with evidence, not gut feel.
          </h1>
          <p className="text-pretty text-muted-foreground">
            Intervue runs structured coding interviews end to end — live questions, a real editor, test runs — and
            hands you a competency report that cites exactly what the candidate said and did.
          </p>
          <ProductPreview />
        </div>
        <p className="text-xs text-muted-foreground">Trusted by 400+ small engineering teams</p>
      </section>

      <section className="flex flex-col items-center justify-center gap-8 p-6 sm:p-10">
        <Logo className="lg:hidden" />
        <LoginCard />
      </section>
    </main>
  )
}
