import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  User,
  Mail,
  FileText,
  Sparkles,
  Copy,
  Check,
  Clock,
  Users,
  ChevronRight,
  Award,
  BookOpen,
  Info,
  Coffee,
  Building,
  Mic,
  ExternalLink
} from 'lucide-react';

// Detailed Data for 13 Papers with 10-minute time slots (7m talk, 2m Q&A, 1m change)
const SESSION1_PAPERS = [
  {
    id: 1,
    timeSlot: "14:15 - 14:25",
    title: "Treadstone: A Communication Channel for Human-AI Collaborative Data Analysis",
    presenter: "Hyunwook Lee, Sungbeom Cho",
    authors: "Hyunwook Lee, Sungbeom Cho, William Benjamin, Changhee Lee, Hyotaek Jeon, Daeun Jeong, Sungbok Shin, Sungahn Ko, Niklas Elmqvist",
    affiliation: "Soongsil University, POSTECH, Sogang University, Aarhus University",
    abstract: "AI 에이전트와 사람이 소셜미디어 피드처럼 소통하며 데이터를 분석하는 플랫폼 Treadstone",
    session: "Paper Session 1"
  },
  {
    id: 2,
    timeSlot: "14:25 - 14:35",
    title: "Swarm Interaction for VA",
    presenter: "Sungbeom Cho",
    authors: "Sungbeom Cho et al.",
    affiliation: "POSTECH",
    abstract: "Swarm Interaction 기반 Visual Analytics (VA) 연구",
    session: "Paper Session 1"
  },
  {
    id: 3,
    timeSlot: "14:35 - 14:45",
    title: "Vis Guideline",
    presenter: "Duc",
    authors: "Duc et al.",
    affiliation: "POSTECH",
    abstract: "데이터 시각화 가이드라인 및 시각적 추천 연구",
    session: "Paper Session 1"
  },
  {
    id: 4,
    timeSlot: "14:45 - 14:55",
    title: "Supporting Chart Caption Understanding with Visual Annotation",
    presenter: "Yoonjae Oh (KAIST)",
    authors: "Yoonjae Oh, Seon Gyeom Kim, Ryan Rossi, Tak Yeon Lee",
    affiliation: "KAIST, Adobe Research",
    abstract: "본 연구는 차트–캡션 이해를 돕기 위해 인간이 생성한 시각적 주석 드로잉의 특성을 분석하고, 이를 MLLM의 차트 주석 생성 과정에서 시각적 가이드라인으로 활용할 수 있는 가능성을 탐구한 연구입니다.",
    session: "Paper Session 1"
  },
  {
    id: 5,
    timeSlot: "14:55 - 15:05",
    title: "When Users Don’t Specify",
    presenter: "Jaeeun Seo (Seoul National University)",
    authors: "Ju et al.",
    affiliation: "Seoul National University (GSDS)",
    abstract: "LLM에게 충분한 프롬프트가 주어지지 않은 unspecified context에서 시각화를 수행할 때, 모델의 시각화 경향성을 expertise/literacy/language의 기준에 따라 empirical하게 분석한 논문입니다.",
    session: "Paper Session 1"
  },
  {
    id: 6,
    timeSlot: "15:05 - 15:15",
    title: "ESVR: 3D Ellipsoid-based Sparse Volume Rendering via Structure-aware Primitive Learning and Per-primitive Ray Sampling",
    presenter: "Suemin Jeon (Korea University)",
    authors: "Suemin Jeon*, Youjin Kim*, Jungwoo Park, Kyungryun Lee, Won-Ki Jeong",
    affiliation: "Korea University",
    abstract: "구조 기반 학습과 per-primitive ray 샘플링을 통한 3D 타원체 기반 sparse 볼륨 렌더링 연구",
    session: "Paper Session 1"
  }
];

const SESSION2_PAPERS = [
  {
    id: 7,
    timeSlot: "15:30 - 15:40",
    title: "Automatic Transfer Function Design via MLLM-Assisted 2D Semantic Decomposition",
    presenter: "Haejin Jeong (Korea University)",
    authors: "Haejin Jeong, Won-Ki Jeong",
    affiliation: "Korea University",
    abstract: "본 연구는 MLLM 기반 2차원 의미 분해를 활용하여 최소한의 사용자 입력만으로 전이 함수를 자동 설계하는 프레임워크를 제안한다. 단일 최대강도투사 영상에서 생성한 의미 정보를 3차원으로 확장하고, 신뢰도 기반 복셀 분류를 통해 정밀한 의미 분할과 전이 함수 생성을 수행한다.",
    session: "Paper Session 2"
  },
  {
    id: 8,
    timeSlot: "15:40 - 15:50",
    title: "Super-Gaussian: Interactive Scene Editing for 3D Gaussian Splatting and NLI-Based Volume Visualization in Virtual Reality",
    presenter: "Suemin Jeon (Korea University)",
    authors: "Suemin Jeon, Kaiyuan Tang, Chaoli Wang, Won-Ki Jeong",
    affiliation: "Korea University, University of Notre Dame",
    abstract: "가상현실에서 3D 가우시안 스플래팅을 위한 인터랙티브 장면 편집과 자연어 상호작용 기반 볼륨 시각화",
    session: "Paper Session 2"
  },
  {
    id: 9,
    timeSlot: "15:50 - 16:00",
    title: "Great Grave: Modeling Versioned Context Units for Longitudinal LLM Interaction",
    presenter: "Jiwon Jang (Seoul National University)",
    authors: "Jang et al.",
    affiliation: "Seoul National University (GSDS)",
    abstract: "LLM 채팅 로그를 Context Unit·Work Unit·타입 엣지로 재구조화하여 연구자의 회고적 센스메이킹을 지원하는 오버레이 시스템 Great Grave 제안",
    session: "Paper Session 2"
  },
  {
    id: 10,
    timeSlot: "16:00 - 16:10",
    title: "Visualization Autocomplete: Visualization Authoring via Stepwise Design Recommendations",
    presenter: "Hyeon Jeon",
    authors: "Hyeon Jeon, Sungbok Shin, Niklas Elmqvist",
    affiliation: "Seoul National University, Sogang University, Aarhus University",
    abstract: "단계별 디자인 추천 기법을 통한 시각화 저작 지원 도구 Visualization Autocomplete",
    session: "Paper Session 2"
  },
  {
    id: 11,
    timeSlot: "16:10 - 16:20",
    title: "TailVis: Expressive Chart Refinement Preserving Data-Binding Integrity",
    presenter: "Yumin Song (Seoul National University)",
    authors: "Yumin Song, Seokhyeon Park, Soohyun Lee, Aeri Cho, John Joon Young Chung, Hyeon Jeon, Jinwook Seo",
    affiliation: "Seoul National University, Midjourney",
    abstract: "발표·논문용 정적 차트는 세밀한 시각적 다듬기가 필요하지만, 기존 도구는 이를 제대로 지원하지 못해 외부 그래픽 편집기로 내보내면서 데이터-시각 연결이 끊긴다. 저자들은 렌더링 이후의 디자인 정제 단계를 포함하도록 InfoVis 참조 모델을 확장하고, 형성 연구(인터뷰 18명·설문 35명)를 근거로 TailVis를 제안한다. TailVis는 요소 단위 직접 선택과 데이터 기반 스코프 확장, 자연어와 동적 위젯의 결합, 지시적(deictic) 상호작용, 프로버Provenance 히스토리를 통해 데이터 바인딩을 유지한 채 표현력 있는 정제를 지원한다. 12명 사용자 연구로 효과를 검증했다.",
    session: "Paper Session 2"
  },
  {
    id: 12,
    timeSlot: "16:20 - 16:30",
    title: "GPU-Accelerated Progressive Uniform Manifold Approximation and Projection",
    presenter: "Myeongwon Jung (Sungkyunkwan University)",
    authors: "Myeongwon Jung, Jaemin Jo",
    affiliation: "Sungkyunkwan University",
    abstract: "GPUMAP은 연산 비용이 높은 UMAP을 GPU 기반 점진적 알고리즘으로 재구성한 차원축소 기법이다. 전체 연산이 끝나고 결과를 확인할 수 있는 기존 UMAP과 달리 최종 결과를 모사한 중간 시각화 결과를 지속적으로 제공하여, 대규모 데이터를 더 빠르게 탐색하고 분석할 수 있도록 지원한다.",
    session: "Paper Session 2"
  },
  {
    id: 13,
    timeSlot: "16:30 - 16:40",
    title: "ProGram: A Grammar for Progressive Computational Pipeline",
    presenter: "Seunghoon Jung (Sungkyunkwan University)",
    authors: "Seunghoon Jung, Jaemin Jo",
    affiliation: "Sungkyunkwan University",
    abstract: "대용량 데이터를 효과적으로 시각화 하여 분석하기 위한 방법론인 점진적 시각화 (Progressive Visual Analytics, PVA) 는 그 데이터를 점진적으로 처리하고 시각화가 갱신되는 구조로 인해 시스템 개발에 여러 어려움이 있다. 이러한 어려움을 해결하고자 개발된 PVA 시스템들을 조사하고, 이를 추상화하여 Grammar를 만들어 PVA 개발에 도움을 주고자 하였다. 이 문법은 이미 구현된 PVA 시스템을 재개발하고 확장하는 방식으로 그 표현력을 평가하였다.",
    session: "Paper Session 2"
  }
];

const ORGANIZERS = [
  {
    name: "Tak Yeon Lee",
    role: "General Chair",
    affiliation: "KAIST",
    dept: "Department of Industrial Design",
    email: "takyeonlee@kaist.ac.kr",
    initials: "TL",
    isChair: true
  },
  {
    name: "Sungbok Shin",
    role: "Organizer",
    affiliation: "Sogang Univ.",
    dept: "Department of Computer Science & Engineering",
    initials: "SS",
    isChair: false
  },
  {
    name: "Hyeon Jeon",
    role: "Organizer",
    affiliation: "Seoul National Univ.",
    dept: "Department of Computer Science & Engineering",
    initials: "HJ",
    isChair: false
  }
];

const SCHEDULE_ITEMS = [
  { time: "13:00 - 13:05", title: "Opening Remarks and Greetings", desc: "Tak Yeon Lee, KAIST" },
  { time: "13:05 - 13:10", title: "Workshop Introduction", desc: "Sponsor Advertisement" },
  { time: "13:10 - 14:00", title: "Keynote Presentation", desc: "Keynote Speaker: TBD (미정, 50분: 40분 발표 + 10분 Q&A)" },
  { time: "14:00 - 14:15", title: "Coffee Break (15분)", desc: "네트워킹 및 휴식 시간" },
  { time: "14:15 - 15:15", title: "Paper Session 1 (6 Papers)", desc: "6개 논문 발표 (각 10분: 7분 발표, 2분 Q&A, 1분 교체)" },
  { time: "15:15 - 15:30", title: "Coffee Break (15분)", desc: "네트워킹 및 휴식 시간" },
  { time: "15:30 - 16:40", title: "Paper Session 2 (7 Papers)", desc: "7개 논문 발표 (각 10분: 7분 발표, 2분 Q&A, 1분 교체)" },
  { time: "16:40 - 16:50", title: "Workshop Closing", desc: "Tak Yeon Lee, KAIST" },
  { time: "17:00 - 18:00", title: "Banquet", desc: "TBD" }
];

export default function App() {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('takyeonlee@kaist.ac.kr');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const renderPaperCard = (paper) => (
    <div
      key={paper.id}
      className="paper-card-full"
      onClick={() => setSelectedPaper(paper)}
      style={{ cursor: 'pointer' }}
    >
      <div className="paper-meta-left">
        <div className="paper-time-badge">
          <Clock size={14} />
          {paper.timeSlot}
        </div>
      </div>

      <div className="paper-content-mid">
        <h3 className="paper-title" style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
          {paper.title}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
          <span><Mic size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }} />{paper.presenter}</span>
          <span><Building size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }} />{paper.affiliation}</span>
        </div>
        {paper.abstract && (
          <div style={{
            fontSize: '0.85rem',
            color: 'var(--text-sub)',
            lineClamp: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginTop: '0.35rem',
            lineHeight: '1.5'
          }}>
            {paper.abstract}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="bg-grid-overlay"></div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#hero" className="nav-brand">
            <span>K-VIS 2026</span>
          </a>
          <ul className="nav-links">
            <li><a href="#venue" className={`nav-link ${activeNav === 'venue' ? 'active' : ''}`} onClick={() => setActiveNav('venue')}>Schedule</a></li>
            <li><a href="#keynote" className={`nav-link ${activeNav === 'keynote' ? 'active' : ''}`} onClick={() => setActiveNav('keynote')}>Keynote</a></li>
            <li><a href="#papers" className={`nav-link ${activeNav === 'papers' ? 'active' : ''}`} onClick={() => setActiveNav('papers')}>Papers</a></li>
            <li><a href="#committee" className={`nav-link ${activeNav === 'committee' ? 'active' : ''}`} onClick={() => setActiveNav('committee')}>Organizers</a></li>
            <li><a href="#contact" className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`} onClick={() => setActiveNav('contact')}>Contact</a></li>
            <li><a href="#sponsorship" className={`nav-link ${activeNav === 'sponsorship' ? 'active' : ''}`} onClick={() => setActiveNav('sponsorship')}>Sponsor</a></li>
          </ul>
        </div>
      </nav>

      <main className="main-wrapper">
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <h1 className="hero-title">
            4th Korea Visualization Workshop
          </h1>

          <p className="hero-subtitle">
            Bringing together researchers, educators, and practitioners to advance data visualization, visual analytics, and interactive data intelligence in South Korea.
          </p>
        </section>

        {/* Schedule & Venue Section */}
        <section id="venue" style={{ padding: '3rem 0' }}>
          <div className="section-header">
            <h2 className="section-title">Venue & Workshop Timeline</h2>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginTop: '0.75rem', 
              padding: '0.45rem 1.15rem', 
              borderRadius: '9999px', 
              background: 'rgba(79, 70, 229, 0.08)', 
              border: '1px solid rgba(79, 70, 229, 0.2)',
              color: 'var(--primary-dark)',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              <Calendar size={18} color="var(--primary-dark)" />
              <span>2026년 8월 26일 (수요일)</span>
            </div>
          </div>

          <div className="venue-container">
            {/* Timeline */}
            <div className="glass-card">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '1.25rem', color: 'var(--primary-dark)' }}>
                Workshop Schedule (13:00 - 18:00)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {SCHEDULE_ITEMS.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    paddingBottom: '0.75rem',
                    borderBottom: idx !== SCHEDULE_ITEMS.length - 1 ? '1px solid #f1f5f9' : 'none',
                    background: item.title.includes('Coffee Break') ? '#fffbeb' : item.title.includes('Banquet') ? '#eff6ff' : 'transparent',
                    padding: (item.title.includes('Coffee Break') || item.title.includes('Banquet')) ? '0.75rem 1rem' : '0 0 0.75rem 0',
                    borderRadius: (item.title.includes('Coffee Break') || item.title.includes('Banquet')) ? 'var(--radius-sm)' : '0'
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: '700', minWidth: '115px', paddingTop: '2px' }}>
                      {item.time}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.975rem', color: 'var(--text-main)' }}>{item.title}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Info */}
            <div className="venue-map-card">
              <div className="venue-details">
                <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Hosted at KAIST</span>
                <h3>KAIST N1빌딩 201호</h3>

                <div className="venue-info-list">
                  <div className="venue-info-item">
                    <MapPin size={18} color="var(--primary-dark)" />
                    <span>KAIST Campus, N1빌딩 (김병호·김삼열 IT 융합빌딩) 201호</span>
                  </div>
                  <div className="venue-info-item">
                    <Calendar size={18} color="var(--primary-dark)" />
                    <span>Wednesday, August 26, 2026</span>
                  </div>
                  <div className="venue-info-item">
                    <Clock size={18} color="var(--primary-dark)" />
                    <span>13:00 - 16:50 (Banquet 17:00 - 18:00)</span>
                  </div>
                </div>
              </div>

              <div className="map-placeholder" style={{ position: 'relative', overflow: 'hidden', padding: 0, minHeight: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: 'var(--radius-md)' }}>
                <img src="./banner.png" alt="KAIST N1 Building Cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.3) 65%, transparent 100%)' }}></div>
                <div style={{ position: 'relative', zIndex: 2, padding: '1.25rem', color: '#ffffff' }}>
                  <div style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '0.2rem', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>KAIST N1빌딩 201호</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.85rem', textShadow: '0 1px 2px rgba(0,0,0,0.6)', lineHeight: '1.4' }}>대전 유성구 대학로 291 KAIST N1빌딩 (김병호·김삼열 IT 융합빌딩) 201호</div>
                  <a
                    href="https://naver.me/54LbpRHT"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--primary-dark)',
                      color: '#ffffff',
                      fontWeight: '600',
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                  >
                    <MapPin size={15} /> 네이버 지도에서 보기 <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Keynote Section */}
        <section id="keynote" style={{ padding: '3rem 0' }}>
          <div className="section-header">
            <h2 className="section-title">Keynote Session</h2>
            <p className="section-subtitle">Inspirational talk from a distinguished researcher in data visualization.</p>
          </div>

          <div className="keynote-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div className="keynote-avatar-wrapper">
              <User size={48} />
            </div>
            <div className="badge badge-tbd" style={{ marginBottom: '0.75rem' }}>
              13:10 - 14:00 (50분: 40분 발표 + 10분 Q&A) • Speaker: TBD (미정)
            </div>
            <h3 className="keynote-name">Keynote Speaker — To Be Announced</h3>
            <div className="keynote-title">Distinguished Guest Lecturer</div>
            <p className="keynote-desc">
              The keynote speaker and talk title for the 4th Korea Visualization Workshop are currently being finalized. Stay tuned for official updates on our keynote presentation focusing on the future of interactive visual intelligence.
            </p>
          </div>
        </section>

        {/* 13 Papers Program Section */}
        <section id="papers" style={{ padding: '3rem 0' }}>
          <div className="section-header">
            <h2 className="section-title">Technical Presentations</h2>
          </div>

          {/* Paper Session 1 */}
          <div className="session-section">
            <div className="session-header-banner">
              <div className="session-header-title">
                <BookOpen size={22} color="var(--primary-dark)" />
                Paper Session 1
              </div>
              <div className="session-header-sub">
                14:15 - 15:15 KST (6 Presentations, 10m each: 7m talk + 2m Q&A + 1m change)
              </div>
            </div>

            <div className="paper-list">
              {SESSION1_PAPERS.map(renderPaperCard)}
            </div>
          </div>

          {/* 15-Minute Coffee Break Card */}
          <div className="break-card">
            <div className="break-card-info">
              <div className="break-icon-wrapper">
                <Coffee size={26} />
              </div>
              <div>
                <div className="break-title">Coffee Break (15분 휴식 시간)</div>
                <div className="break-desc">Informal Discussions, Coffee & Refreshments</div>
              </div>
            </div>
            <div className="break-time-badge">
              15:15 - 15:30 (15 Min)
            </div>
          </div>

          {/* Paper Session 2 */}
          <div className="session-section">
            <div className="session-header-banner">
              <div className="session-header-title">
                <BookOpen size={22} color="var(--primary-dark)" />
                Paper Session 2
              </div>
              <div className="session-header-sub">
                15:30 - 16:40 KST (7 Presentations, 10m each: 7m talk + 2m Q&A + 1m change)
              </div>
            </div>

            <div className="paper-list">
              {SESSION2_PAPERS.map(renderPaperCard)}
            </div>
          </div>
        </section>

        {/* Organizing Committee Section */}
        <section id="committee" style={{ padding: '3rem 0' }}>
          <div className="section-header">
            <h2 className="section-title">Organizing Committee</h2>
            <p className="section-subtitle">Chairs and organizers leading the 4th Korea Visualization Workshop.</p>
          </div>

          <div className="committee-grid">
            {ORGANIZERS.map((org, index) => (
              <div key={index} className="glass-card committee-card">
                <div className="committee-avatar">
                  {org.initials}
                </div>
                <div className="committee-info">
                  <div className="committee-role">
                    {org.role}
                  </div>
                  <h4>{org.name}</h4>
                  <div className="committee-affiliation">
                    {org.affiliation}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {org.dept}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Get in Touch</h2>
          <p className="section-subtitle">
            For questions regarding paper submissions, program schedule, or participation, please contact General Chair Tak Yeon Lee.
          </p>

          <div style={{ margin: '1.5rem 0' }}>
            <div style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--text-main)' }}>
              Tak Yeon Lee (General Chair)
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              KAIST Industrial Design
            </div>
          </div>

          <div className="contact-card">
            <Mail size={18} color="var(--primary-dark)" />
            <span className="contact-email">takyeonlee@kaist.ac.kr</span>
            <button className="copy-btn" onClick={handleCopyEmail}>
              {copiedEmail ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}><Check size={14} /> Copied</span> : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}><Copy size={14} /> Copy</span>}
            </button>
          </div>
        </section>

        {/* Sponsorship Section */}
        <section id="sponsorship" style={{ padding: '3rem 0' }}>
          <div className="section-header">
            <h2 className="section-title">Sponsorship & Support</h2>
            <p className="section-subtitle">Special thanks to our sponsors for supporting the 4th Korea Visualization Workshop.</p>
          </div>

          <div style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ 
              background: '#ffffff', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '1.25rem', 
              boxShadow: 'var(--shadow-card)',
              overflow: 'hidden' 
            }}>
              <img 
                src="./sponsor.png" 
                alt="2026 AI 응용제품 신속상용화 지원사업 (환경) - 한국환경산업기술원" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'block' 
                }} 
              />
            </div>

            <div style={{ 
              background: '#ffffff', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '1.25rem', 
              boxShadow: 'var(--shadow-card)',
              overflow: 'hidden' 
            }}>
              <img 
                src="./sponsor2.png" 
                alt="greenflow Project - 그린플로 프로젝트 맞춤형 솔루션" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'block' 
                }} 
              />
            </div>
          </div>
        </section>
      </main>

      {/* Paper Detail Modal */}
      {selectedPaper && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(6px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }} onClick={() => setSelectedPaper(null)}>
          <div className="glass-card" style={{
            maxWidth: '650px',
            width: '100%',
            background: '#ffffff',
            border: '1px solid var(--border-accent)',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.15)',
            maxHeight: '85vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div className="paper-time-badge">
                <Clock size={14} /> {selectedPaper.timeSlot} (10 Min: 7m talk + 2m Q&A + 1m change)
              </div>
              <button
                onClick={() => setSelectedPaper(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              {selectedPaper.title}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div><Mic size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />{selectedPaper.presenter}</div>
              <div><Building size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />{selectedPaper.affiliation}</div>
              <div><User size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />{selectedPaper.authors}</div>
            </div>

            {selectedPaper.abstract ? (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: '700', fontSize: '0.925rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>논문 요약 (Abstract)</div>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-sub)', lineHeight: '1.65', background: '#ffffff', padding: '0.5rem 0' }}>
                  {selectedPaper.abstract}
                </p>
              </div>
            ) : (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                논문 요약문은 추후 업로드될 예정입니다.
              </p>
            )}

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setSelectedPaper(null)}
            >
              닫기 (Close)
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <p>© 2026 Korea Visualization Workshop (K-VIS 2026). Hosted at KAIST.</p>
        </div>
      </footer>
    </div>
  );
}
