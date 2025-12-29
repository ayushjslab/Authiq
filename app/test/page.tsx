"use client";

export default function Home() {
  const handlePay = () => {
    const params = new URLSearchParams();
    params.append("products[]", process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID!);

    window.location.href = `/api/checkout?${params.toString()}`;
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Buy Product</h1>
      <button onClick={handlePay}>
        Pay with Polar
      </button>
    </main>
  );
}
