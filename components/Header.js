import React from 'react'
import { Link } from '../routes'

export default function Header() {
  return (
    <header>
      <Link route="home">
        <a><h2>React Suki</h2></a>
      </Link>
      <style jsx>{`
        header {
          text-align: center;
        }
        a {
          color: #666;
          text-decoration: none;
        }
      `}</style>
    </header>
  )
}
