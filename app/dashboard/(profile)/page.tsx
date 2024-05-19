import React from "react";
import Image from 'next/image'
import pfp from '@/components/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg'
import civil from '@/components/img/4219711.png'
import birth from '@/components/img/8926835.png'
import email from '@/components/img/8743964.png'
import memtype from '@/components/img/5455787.png'
import position from '@/components/img/6214076.png'
import office from '@/components/img/4924628.png'
import loan from '@/components/img/9903593.png'
import amount from '@/components/img/5329260.png'
import payment from '@/components/img/4108843.png'
import { Mail } from "lucide-react";

export default function Profile() {
  return (
    <section className="w-full bg-gray-60 dark:bg-gray-800 h-grow">
        <div className="gap-6 flex flex-row items-center justify-start space-x-4 text-left">
          <div className="inline-block rounded-lg bg-gray-60 px-3 py-1 text-sm dark:bg-gray-800 text-upcolor">
            <Image
              alt="Image"
              className="overflow-hidden rounded-xl object-cover object-left lg:order-last"
              height="150"
              src={pfp}
              width="150"
            />
          </div>
          <div className="space-y-2">
            <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-5xl">John Doe</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Membership Number: UPMIN001
            </p>
          </div>
        </div>
        <hr className="h-px my-6 bg-black border-0 dark:bg-white"></hr>

        <div className="grid max-w-10xl grid-cols-1 items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center space-y-4 border-2 border-black dark:border-white bg-white dark:bg-gray-900 rounded-xl p-10 pb-20">
            <ul className="grid gap-6">
              <li className="mb-6">
                <div className="grid gap-6">
                  <h3 className="text-3xl font-bold text-upcolor dark:text-white">Personal Information</h3>
                  <div className="flex items-center">
                    <Image
                      alt="Civil Status"
                      className="overflow-hidden rounded-xl object-cover object-left "
                      height="60"
                      src={civil}
                      width="60"
                    />
                    <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                      Civil Status: Single
                    </p>
                  </div>

                  <div className="flex items-center">
                    <Image
                      alt="Date of Birth"
                      className="overflow-hidden rounded-xl object-cover object-left"
                      height="60"
                      src={birth}
                      width="60"
                    />
                    <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                      Date of Birth: September 26, 2003
                    </p>
                  </div>
                </div>
              </li>
              <li className="mb-6">
                <div className="grid gap-6">
                  <h3 className="text-3xl font-bold text-upcolor dark:text-white">Contact Information</h3>
                  <div className="flex items-center">
                    <Mail className="w-20 h-10 float-left"/>
                    <p className="ml-2 text-base text-gray-500 dark:text-gray-400">
                      Email: john@example.com
                    </p>
                  </div>
                </div>
              </li>
              <li className="mb-6">
                <div className="grid gap-6">
                  <h3 className="text-3xl font-bold text-upcolor dark:text-white">Membership Details</h3>
                  <div className="flex items-center">
                    <Image
                      alt="Membership Type"
                      className="overflow-hidden rounded-xl object-cover object-left"
                      height="60"
                      src={memtype}
                      width="60"
                    />
                    <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                      Membership Type: Regular Membership
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center space-y-4 border-2 border-black dark:border-white bg-white dark:bg-gray-900 rounded-xl p-10 ">
            <ul className="grid gap-6">
              <li className="mb-6">
                <div className="grid gap-6">
                  <h3 className="text-3xl font-bold text-upcolor dark:text-white">Employment Information</h3>
                  <div className="flex items-center">
                    <Image
                      alt="Position"
                      className="overflow-hidden rounded-xl object-cover object-left"
                      height="60"
                      src={position}
                      width="60"
                    />
                    <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                      Position Title: Secretary
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Image
                      alt="Office"
                      className="overflow-hidden rounded-xl object-cover object-left"
                      height="60"
                      src={office}
                      width="60"
                    />
                    <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                      Office/Unit: Kalimudan House
                    </p>
                  </div>
                </div>
              </li>
              <li className="mb-6">
                <div className="grid gap-6">
                  <h3 className="text-3xl font-bold text-upcolor dark:text-white">Loan Details</h3>
                  <div className="flex items-center">
                    <Image
                      alt="Loan"
                      className="overflow-hidden rounded-xl object-cover object-left"
                      height="60"
                      src={loan}
                      width="60"
                    />
                    <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                      I would like to apply for: Regular Loan
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Image
                      alt="Amount"
                      className="overflow-hidden rounded-xl object-cover object-left"
                      height="60"
                      src={amount}
                      width="60"
                    />
                    <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                      Amount in words: One thousand
                      <span className="block text-base text-black-400 dark:text-black-500">(PhP 600)</span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Image
                      alt="Payment"
                      className="overflow-hidden rounded-xl object-cover object-left"
                      height="60"
                      src={payment}
                      width="60"
                    />
                    <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                      Payable in: 1 month
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </section>
  )
}