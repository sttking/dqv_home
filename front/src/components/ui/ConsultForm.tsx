'use client'
import { useState } from 'react'
import { Input } from './input'

type FormType = {
  name: string
  email: string
  p_num: string
  c_name: string
  b_name: string
}

const formFields = [
  { field: 'name', placeholder: '이름 *' },
  { field: 'email', placeholder: '회사 이메일 *' },
  { field: 'p_num', placeholder: '연락처 *' },
  { field: 'c_name', placeholder: '회사(단체)명 *' },
  { field: 'b_name', placeholder: '부서/직함' },
]
export default function ConsultForm() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showMarketingModal, setShowMarketingModal] = useState(false)
  const [formInput, setFormInput] = useState<FormType>({ name: '', email: '', p_num: '', c_name: '', b_name: '' })
  const handleInputChange = (field: keyof FormType, value: string) => {
    setFormInput((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formInput)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-8 md:mt-12">
      <div className="flex-1 space-y-4 text-left">
        <h3 className="text-xl md:text-2xl font-semibold">
          AI에이전트, <br /> 다큐브와 함께 시작하세요
        </h3>
        <p className="text-lg font-medium text-gray-900">02-889-8425</p>
        <p className="text-[#202F76] font-semibold">business@daquv.com</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-3">
        {formFields.map((item) => (
          <Input
            key={item.field}
            type="text"
            placeholder={item.placeholder}
            value={formInput[item.field as keyof FormType]}
            onChange={(e) => handleInputChange(item.field as keyof FormType, e.target.value)}
          />
        ))}

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <input type="checkbox" id="privacy" className="mt-1" />
            <label htmlFor="privacy" className="text-sm text-gray-700">
              개인정보 수집 동의 (필수)
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="text-xs text-red-600 ml-1 underline"
              >
                자세히
              </button>
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="marketing" className="mt-1" />
            <label htmlFor="marketing" className="text-sm text-gray-700">
              마케팅 수신 동의 (선택)
              <button
                type="button"
                onClick={() => setShowMarketingModal(true)}
                className="text-xs text-red-600 ml-1 underline"
              >
                자세히
              </button>
            </label>
          </div>
        </div>

        <button type="submit" className="w-full bg-[#202F76] text-white py-2 rounded hover:opacity-90">
          상담 신청하기 
        </button>
      </form>

      {/* 팝업 예시 */}
      {showPrivacyModal && (
        <div
          onClick={() => setShowPrivacyModal(!showPrivacyModal)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h4 className="font-semibold text-lg mb-4">개인정보 수집 동의</h4>
            <p className="text-sm text-gray-700">여기에 상세 내용 입력</p>
            <button onClick={() => setShowPrivacyModal(false)} className="mt-4 text-blue-600 underline text-sm">
              닫기
            </button>
          </div>
        </div>
      )}

      {showMarketingModal && (
        <div
          onClick={() => setShowPrivacyModal(!showPrivacyModal)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h4 className="font-semibold text-lg mb-4">마케팅 수신 동의</h4>
            <p className="text-sm text-gray-700">여기에 상세 내용 입력</p>
            <button onClick={() => setShowMarketingModal(false)} className="mt-4 text-blue-600 underline text-sm">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
