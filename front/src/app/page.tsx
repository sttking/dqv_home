'use client'

import { AnimatePresence, motion } from 'framer-motion'
import TopNav from '@/components/layout/TopNav'
import SectionHeader from '@/components/ui/SectionHeader'
import InfoTab from '@/components/ui/InfoTab'
import VideoSection from '@/components/ui/VideoSection'
import ExampleFolder from '@/components/ui/ExampleFolder'
import TeamMember from '@/components/ui/TeamProfiles'
import ConsultForm from '@/components/ui/ConsultForm'
import Footer from '@/components/ui/Footer'

import { infoTabs, qv1advantage } from '@/constants/infotab.constant'
import { dqvIntroVideoId } from '@/constants/video.constant'
import { exampleFolders } from '@/constants/example.constant'
import { teamMembers } from '@/constants/teamMembers.constant'

export default function Home() {
  return (
    <AnimatePresence>
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="w-full pt-32 md:pt-40 max-w-4xl mx-auto pb-20 px-4">
          <SectionHeader
            title="SYSTEM to AGENT, 시스템의 에이전트화"
            subtitle={
              <>
                다큐브는 TEXT-to-SQL AI 에이전트를 연구/개발합니다. <br />
                AI 에이전트 개발의 핵심기술입니다. <br />
                IT기업들과 협력하여 시스템을 에이전트로 전환합니다.
              </>
            }
          />

          {/* 기능 탭 */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 md:mt-16 px-4 md:px-10">
            {infoTabs.map((tab, index) => (
              <motion.div
                key={tab.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <InfoTab {...tab} />
              </motion.div>
            ))}
          </motion.div>

          {/* QV-1 소개 */}
          <motion.div className="mt-24 md:mt-32">
            <SectionHeader
              title="QV-1 큐비원 소개"
              subtitle={
                <>
                  QV-1은 TEXT-to-SQL AI에이전트 플랫폼입니다. <br />
                  관계형 데이터베이스의 데이터를 자연어로 검색하고, 분석하고, 예측합니다. <br />
                  QV-1을 활용하여 AI 에이전트 신상품을 개발하거나 기존 시스템을 에이전트로 전환합니다.
                </>
              }
            />
            <VideoSection videoId={dqvIntroVideoId} />
          </motion.div>

          {/* 특장점 */}
          <motion.section className="mt-24 md:mt-28">
            <SectionHeader
              title="QV-1 큐비원 특장점"
              subtitle={
                <>
                  &quot;비용이 많이 든다.&quot; &quot;데이터 유출이 걱정이다.&quot;
                  <br />
                  QV-1은 비용과 보안 걱정이 없는 보급형 AI 에이전트입니다.
                </>
              }
            />
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 md:mt-16 px-4 md:px-10">
              {qv1advantage.map((advantage) => (
                <motion.div key={advantage.title}>
                  <InfoTab {...advantage} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* 적용사례 */}
          <motion.section className="mt-24" id="customer-cases">
            <SectionHeader
              title="QV-1 적용 에이전트 구축 사례"
              subtitle="IT기업들과 협력하여 AI 에이전트 전환/개발 사업을 추진하고 있습니다"
            />
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-16 mt-8 md:mt-12">
              {exampleFolders.map((folder, index) => (
                <motion.div
                  key={`${folder.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                  }}
                >
                  <ExampleFolder {...folder} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* 구성 멤버 */}
          <motion.div
            className="mt-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader title="구성 멤버" />
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 md:mt-12">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                  }}
                >
                  <TeamMember name={member.name} title={member.title} description={member.description} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 상담신청 */}
          <motion.div
            className="mt-24"
            id="consult-form"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader title="상담신청" />
            <ConsultForm />
          </motion.div>
        </main>

        {/* 푸터 */}
        <Footer />
      </div>
    </AnimatePresence>
  )
}
