'use client'

import { Header } from '@/components/Header'
import { useAccount } from 'wagmi'
import { Wallet, Zap, Shield, Globe } from 'lucide-react'

export default function Home() {
  const { address, isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to Base Mini App
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A Next.js application built with OnchainKit, featuring wallet connectivity, 
            Base network integration, and modern web3 functionality.
          </p>
          
          {!isConnected && (
            <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-muted-foreground mb-4">
                Connect your wallet to get started
              </p>
              <div className="flex justify-center">
                <Wallet className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          )}
          
          {isConnected && (
            <div className="bg-primary/10 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-primary font-medium mb-2">
                🎉 Wallet Connected!
              </p>
              <p className="text-sm text-muted-foreground">
                Address: {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Wallet className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-semibold">Smart Wallet</h3>
            </div>
            <p className="text-muted-foreground">
              Connect with Coinbase Smart Wallet for seamless onchain interactions
            </p>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Zap className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-semibold">Base Network</h3>
            </div>
            <p className="text-muted-foreground">
              Built on Base - fast, secure, and low-cost Ethereum L2 solution
            </p>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-semibold">OnchainKit</h3>
            </div>
            <p className="text-muted-foreground">
              Powered by Coinbase's OnchainKit for reliable web3 components
            </p>
          </div>
        </div>

        {/* Status Section */}
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">App Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium">Next.js</span>
              </div>
              <p className="text-sm text-muted-foreground">Ready</p>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium">OnchainKit</span>
              </div>
              <p className="text-sm text-muted-foreground">Connected</p>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-2">
                <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="font-medium">Wallet</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {isConnected ? 'Connected' : 'Not Connected'}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with Next.js, OnchainKit, and Base</p>
        </div>
      </footer>
    </div>
  )
}
