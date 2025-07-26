import { GetStartedButton } from "@/components/get-started";

export default async function Home() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-6xl font-bold">Garage 4</h1>
        <GetStartedButton />
      </div>
    </div>
  );
}
